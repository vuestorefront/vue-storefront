## 1. Add re-order button feedback

- [x] 1.1 Register and use the existing theme `MSpinnerButton` for `re-order` actions in `order-item-actions.vue`, passing the current button styling and disabled state through its supported props.
- [x] 1.2 Add a setup-owned local loading ref that is set immediately before `REORDER_ITEM_ACTION`, supplied to `MSpinnerButton.showSpinner`, guarded against repeated execution, and cleared in `finally` without changing the existing success or error branches.
- [x] 1.3 Add a localized `sr-only` polite live status that announces the item is being re-ordered while the local loading state is active and clears when it settles.
