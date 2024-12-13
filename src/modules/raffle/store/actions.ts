import { ActionTree } from 'vuex';
import config from 'config';

import { TaskQueue } from '@vue-storefront/core/lib/sync';
import { processURLAddress } from '@vue-storefront/core/helpers'
import RootState from '@vue-storefront/core/types/RootState';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';

import CurrentState from '../models/current-state.model';
import ParticipantData from '../models/participant-data.model';
import { StoreState } from '../types/store-state.interface';
import { FETCH_CURRENT_STATE, FETCH_WINNING_TICKETS, REGISTER, SYNCHRONIZE, VERIFY_TOKEN } from '../types/action';
import { GET_CURRENT_STATE, GET_IS_SYNCED, GET_LAST_WINNING_TICKETS, GET_REFERRER_TOKEN } from '../types/getter';
import { CURRENT_STATE_SET, IS_SYNCED_SET, LAST_WINNING_TICKETS_SET, PARTICIPANT_DATA_SET, REFERRER_TOKEN_SET } from '../types/mutation';
import { TokenStatusValue } from '../types/token-status.value';
import { SN_RAFFLE } from '../types/store-name';
import { RAFFLE_TOKEN, REFERRER_TOKEN } from '../types/local-storage-keys';

const baseRaffleUrl = `${config.budsies.endpoint}/raffle`;

export const actions: ActionTree<StoreState, RootState> = {
  async [FETCH_CURRENT_STATE] (
    { commit, getters },
    { useCache }: { useCache: boolean } = { useCache: true }
  ): Promise<CurrentState> {
    const cachedState = getters[GET_CURRENT_STATE];

    if (cachedState && useCache) {
      return cachedState;
    }

    const url = processURLAddress(`${baseRaffleUrl}/states/current`);

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: {
          'Accept': 'application/json'
        },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    if (resultCode !== 200) {
      throw new Error(`Error while fetch raffle current state`);
    }

    const currentState = new CurrentState(result.capacity, result.nextDrawing);

    commit(CURRENT_STATE_SET, currentState);

    return currentState;
  },
  async [REGISTER] (
    { commit, getters },
    {
      email,
      firstName,
      lastName
    }: {
      email: string,
      firstName: string,
      lastName: string
    }): Promise<ParticipantData> {
    const url = processURLAddress(`${baseRaffleUrl}/registrations`);
    const referrerCode = getters[GET_REFERRER_TOKEN];

    const data = {
      email,
      lastName,
      firstName,
      referrerCode
    };

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data)
      },
      silent: false
    });

    if (resultCode !== 200) {
      const message = result.errorMessage || 'Error during the raffle registration';
      throw new Error(message);
    }

    const participantData = new ParticipantData(
      result.participantId,
      result.referralLink,
      result.tickets,
      result.token,
      result.canPurchaseSpecComm
    );

    commit(PARTICIPANT_DATA_SET, participantData);

    return participantData;
  },
  async [FETCH_WINNING_TICKETS] (
    { commit, getters },
    { useCache }: { useCache: boolean } = { useCache: true }
  ): Promise<string[]> {
    const url = processURLAddress(`${baseRaffleUrl}/tickets/winning`);
    const fetchedWinningTickets = getters[GET_LAST_WINNING_TICKETS];

    if (fetchedWinningTickets.length && useCache) {
      return fetchedWinningTickets;
    }

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: {
          'Accept': 'application/json'
        },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    if (resultCode !== 200) {
      throw new Error(`Error while fetch winning tickets`);
    }

    commit(LAST_WINNING_TICKETS_SET, result);

    return result;
  },
  async [VERIFY_TOKEN] ({ commit }, token: string): Promise<boolean> {
    const url = processURLAddress(`${baseRaffleUrl}/tokenVerificationRequests`);

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          token
        })
      },
      silent: true
    });

    if (resultCode !== 200) {
      throw new Error(`Raffle token verification error`);
    }

    if (result.status === TokenStatusValue.NOT_FOUND) {
      commit(PARTICIPANT_DATA_SET, undefined);
      return false;
    }

    const participantDataResponse = result.participantData;

    const participantData = new ParticipantData(
      participantDataResponse.participantId,
      participantDataResponse.referralLink,
      participantDataResponse.tickets,
      participantDataResponse.token,
      participantDataResponse.canPurchaseSpecComm
    );

    commit(PARTICIPANT_DATA_SET, participantData);

    return true;
  },
  async [SYNCHRONIZE] ({ getters, commit, dispatch }): Promise<void> {
    if (getters[GET_IS_SYNCED]) {
      return;
    }

    const raffleStorage = StorageManager.get(SN_RAFFLE);

    const token = await raffleStorage.getItem(RAFFLE_TOKEN);
    const referrerToken = await raffleStorage.getItem(REFERRER_TOKEN);

    if (referrerToken) {
      commit(REFERRER_TOKEN_SET, referrerToken);
    }

    if (token) {
      await dispatch(VERIFY_TOKEN, token);
    }

    commit(IS_SYNCED_SET, true);
  }
}
