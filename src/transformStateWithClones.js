'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
      stateHistory.push({ ...currentState });
    }

    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
      stateHistory.push({ ...currentState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
      stateHistory.push({ ...currentState });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
