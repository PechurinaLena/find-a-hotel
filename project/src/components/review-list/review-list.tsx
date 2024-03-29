import {FC, useEffect} from 'react';
import {default as dayjs} from 'dayjs';

import ReviewForm from 'components/review-form';
import {getReviewLoaded} from 'store/slices/reviews-process/selectors';
import {fetchReviewsAction} from 'store/api-actions';
import {Review} from 'types/reviews';
import {useAppDispatch, useAppSelector} from 'hooks';
import {compareDates, getRatingWidth} from 'utils';
import {REVIEWS_MAX_LENGTH} from 'const';
import {Numbers} from 'enums';

export type ReviewListProps = {
  reviews: Review[];
  hotelId: number;
  isAuthorizedUser: boolean;
}

export const ReviewList: FC<ReviewListProps> = ({reviews, isAuthorizedUser, hotelId}) => {
  const dispatch = useAppDispatch();
  const isReviewLoaded = useAppSelector(getReviewLoaded);

  useEffect(() => {
    if (!isReviewLoaded) {
      dispatch(fetchReviewsAction({hotelId}));
    }
  }, [isReviewLoaded, dispatch, hotelId]);

  const filteredReviews = () => reviews.slice().sort(compareDates).slice(Numbers.Zero, REVIEWS_MAX_LENGTH);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">
          {reviews.length}
        </span>
      </h2>
      {filteredReviews().map((review) => (
        <ul className="reviews__list" key={review.id}>
          <li className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54"
                  height="54"
                  alt="Reviews avatar"
                />
              </div>
              <span className="reviews__user-name">
                {review.user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: `${getRatingWidth(review.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {review.comment}
              </p>
              <time className="reviews__time" dateTime={review.date}>
                {dayjs(review.date).format('MMMM YYYY')}
              </time>
            </div>
          </li>
        </ul>
      ))}
      {isAuthorizedUser &&
        <ReviewForm hotelId={hotelId}/>}
    </section>
  );
};

export default ReviewList;
