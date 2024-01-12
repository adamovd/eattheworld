import { useEffect, useState } from "react";
import { getReviewsOnRecipe } from "../Services/reviewServices";
import { Review, User } from "../Models/dbTypes";
import Image from "next/image";
import { getUserById } from "../Services/userServices";
import { format } from "date-fns";
import {
  ReviewBottomSection,
  ReviewContainer,
  ReviewTopSection,
} from "../Styles/Components/Containers";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const PresentReviews = ({
  recipeId,
  updateReviews,
  containerRef,
}: {
  recipeId: string;
  updateReviews: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<{ [key: string]: User }>({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewsOnRecipe(recipeId);
        setReviews(response.reverse());

        const usersPromises = response.map((review: Review) =>
          getUserById(review.userId as string)
        );

        const usersData = await Promise.all(usersPromises);
        const usersMap: { [key: string]: User } = {};

        usersData.forEach((userData, index) => {
          usersMap[response[index].userId as string] = userData;
        });

        setUser(usersMap);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [recipeId, updateReviews]);

  return (
    <div ref={containerRef}>
      {reviews && user ? (
        <>
          {" "}
          {reviews.map((review, index) => (
            <ReviewContainer
              key={index}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
            >
              <ReviewTopSection>
                <section style={{ position: "relative" }}>
                  <Link href={`/user/${user[review.userId as string]?.id}`}>
                    <Image
                      src={user[review.userId as string]?.image as string}
                      alt={`Profile picture of ${
                        user[review.userId as string]?.firstname
                      }`}
                      width={40}
                      height={40}
                      style={{ borderRadius: 50, position: "relative" }}
                    />
                  </Link>
                  <Image
                    src={user[review.userId as string]?.flag as string}
                    alt={`Flag of ${
                      user[review.userId as string]?.nationality
                    }`}
                    width={20}
                    height={20}
                    objectFit="cover"
                    style={{ position: "absolute", top: "-2px", right: "-7px" }}
                  />
                </section>

                <p>
                  {user[review.userId as string]?.firstname}{" "}
                  {user[review.userId as string]?.lastname}
                </p>
                <span>
                  {review.rating} <FontAwesomeIcon icon={faStar} />
                </span>
                <small>
                  {review
                    ? format(
                        new Date(review?.createdAt as Date),
                        "d MMMM yyyy"
                      ).toString()
                    : null}
                </small>
              </ReviewTopSection>
              <ReviewBottomSection>
                <p>{review.summary}</p>
              </ReviewBottomSection>
            </ReviewContainer>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default PresentReviews;
