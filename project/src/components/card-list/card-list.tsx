import {FC} from 'react';

import Card from 'components/card';
import {Offer} from 'types/offers';
import {setSelectedPoint} from 'store/reducers/offer/action';
import {useAppDispatch, useAppSelector} from 'hooks';
import {AuthorizationStatus} from 'components/app/const';

export type CardListProps = {
  cityOffers: Offer[];
}

export const CardList: FC<CardListProps> = ({cityOffers}) => {
  const dispatch = useAppDispatch();

  const {authorizationStatus} = useAppSelector((state) => state.USER);
  const isAuthorizedUser = authorizationStatus === AuthorizationStatus.Auth;

  const onListItemHover = (listItemId: number) => dispatch(setSelectedPoint(listItemId));

  return (
    <>
      {cityOffers.map((card) => (
        <Card card={card} key={card.id}
          isAuthorizedUser={isAuthorizedUser}
          onListItemHover={onListItemHover}
        />
      ))}
    </>
  );
};

export default CardList;
