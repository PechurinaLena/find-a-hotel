import {State} from 'types/state';
import {City, Offer} from 'types/offers';
import {NameSpace} from 'enums';

export const getSelectedPoint = (state: State): Offer['id'] => state[NameSpace.Offers].selectedCard;
export const getActiveCity = (state: State): City => state[NameSpace.Offers].currentCity;

