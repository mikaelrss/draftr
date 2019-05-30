export const TOGGLE_ACTIVATION_STATUS = 'TOGGLE_ACTIVATION_STATUS';

export interface ToggleActivationStatusAction {
  type: typeof TOGGLE_ACTIVATION_STATUS;
}

export const toggleActivationStatus = () => ({
  type: TOGGLE_ACTIVATION_STATUS,
});

export type DraftModeActions = ToggleActivationStatusAction;
