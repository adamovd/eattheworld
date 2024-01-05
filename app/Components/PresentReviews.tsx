import { useEffect, useState } from "react";
import { getReviewsOnRecipe } from "../Services/reviewServices";
import { Review, User } from "../Models/dbTypes";
import Image from "next/image";
import { getUserById } from "../Services/userServices";
import { format } from "date-fns";

const PresentReviews = ({ recipeId }: { recipeId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({});

  useEffect(() => {
    getReviewsOnRecipe(recipeId).then((response) => {
      setReviews(response);
      response.forEach((review: Review) => {
        getUserById(review.userId as string).then((userResponse) => {
          setUsers((prevUsers) => ({
            ...prevUsers,
            [review.userId as string]: userResponse,
          }));
        });
      });
    });
  }, [recipeId]);

  return (
    <div>
      {reviews.map((review, index) => (
        <section key={index}>
          <Image
            src={users[review.userId as string]?.image as string}
            alt={`Profile picture of ${
              users[review.userId as string]?.firstname
            }`}
            width={50}
            height={50}
          />
          <small>
            {review
              ? format(
                  new Date(review?.createdAt as Date),
                  "MMMM yyyy"
                ).toString()
              : null}
          </small>
          <p>{review.summary}</p>
          <small>{review.rating}</small>
        </section>
      ))}
    </div>
  );
};

export default PresentReviews;
