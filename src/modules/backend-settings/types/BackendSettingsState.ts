import { Dictionary } from 'src/modules/budsies';

export default interface BackendSettingsState {
  isSynced: boolean,
  settings: Dictionary<any>
}
