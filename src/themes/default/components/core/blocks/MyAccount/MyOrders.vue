<template>
  <div class="my-orders mb35">
    <!-- My orders header -->
    <div class="row mb15">
      <div class="col-xs-12" :class="{ 'cl-accent' : !isActive }">
        <h3 class="m0 mb5">
          {{ $t('My orders') }}
        </h3>
      </div>
    </div>
    <!-- My orders body -->
    <div class="row mt30">
      <div class="col-xs-12">
        <table class="brdr-1 brdr-cl-bg-secondary">
          <thead>
            <tr>
              <th class="p20 serif lh20">Order ID</th>
              <th class="p20 serif lh20">Date and time</th>
              <th class="p20 serif lh20">Author</th>
              <th class="p20 serif lh20">Value</th>
              <th class="p20 serif lh20">Type</th>
              <th colspan="2" class="p20 serif lh20">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="brdr-top-1 brdr-cl-bg-secondary">
              <td class="p20 fs-medium lh25">12345678</td>
              <td class="p20 fs-medium lh25">17:15 2/13/2018</td>
              <td class="p20 fs-medium lh25">Jane Plane</td>
              <td class="p20 fs-medium lh25">$130.00</td>
              <td class="p20 fs-medium lh25">Purchase</td>
              <td class="p20 fs-medium lh25">Pending</td>
              <td class="p20 fs-medium lh25">
                <span class="more relative">
                  <i class="material-icons cl-secondary pointer">more_horiz</i>
                  <div class="text absolute p20 h5 bg-cl-th-accent cl-white">
                    Phone number may be needed by carrier
                  </div>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/MyAccount/MyOrders')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-border: color(accent);

table {
  border-collapse: collapse;
  width: 100%;

  th {
    text-align: left;
  }

  i {
    vertical-align: middle;
  }

}

.more {

  &:hover .text {
    display: block;
  }

  .text {
    display: none;
    left: 50%;
    transform: translateX(-50%);
    top: 30px;
    box-sizing: border-box;
    width: 200px;
    text-align: center;

    &:before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      border: 10px solid transparent;
      border-bottom: 10px solid $color-border;
      left: 50%;
      transform: translateX(-50%);
      top: -20px;
    }
  }

}
</style>
