import { useForm, Resolver } from "react-hook-form";
import { Review } from "../Models/dbTypes";
import { createNewReview } from "../Services/reviewServices";
import {
  FormContainer,
  PostReviewContainer,
  PostReviewSection,
} from "../Styles/Components/Containers";
import {
  InputContainer,
  InputLabel,
  InputField,
  TextArea,
} from "../Styles/Components/InputFields";
import { Button } from "../Styles/Components/Buttons";
import { useStars } from "stars-rating-react-hooks";
import { useState } from "react";

const ReviewForm = ({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Review>();
  const config = {
    totalStars: 5,
    initialSelectedValue: 2,
    renderFull: "★",
    renderEmpty: "☆",
  };

  const {
    stars,
    getStarProps,
    getStarWrapperProps,
    isSelecting,
    // selectingValue and selectedValue are same after user rates
    selectingValue,
    selectedValue,
  } = useStars(config);

  const onSubmit = handleSubmit(async (data) => {
    try {
      createNewReview(data, userId, recipeId);
      reset();
    } catch (error) {
      console.error("Error while register", error);
    }
  });

  return (
    <PostReviewContainer>
      <form onSubmit={onSubmit}>
        <PostReviewSection>
          <InputContainer>
            <InputLabel htmlFor="summary">What did you think?</InputLabel>
            <TextArea
              {...register("summary")}
              id="summary"
              name="summary"
              rows={3}
              defaultValue={""}
              placeholder="Write a review of the recipe..."
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Rate the recipe</InputLabel>
            <span
              {...getStarWrapperProps({
                style: {
                  cursor: "pointer",
                },
              })}
            >
              {stars?.map((star, i) => (
                <span
                  key={i}
                  {...getStarProps(i, {
                    style: {
                      fontSize: "50px",
                      color: "gold",
                    },
                    onClick: (event: HTMLInputElement, ratedValue: number) => {
                      setValue("rating", ratedValue);
                    },
                  })}
                >
                  {star}
                </span>
              ))}
            </span>
          </InputContainer>
        </PostReviewSection>
        <InputContainer>
          <Button
            type="submit"
            bgcolor="--Yellow"
            textcolor="--Dark"
            fontSize="1rem"
            style={{ alignSelf: "flex-end" }}
          >
            Post
          </Button>
        </InputContainer>
      </form>
    </PostReviewContainer>
  );
};

export default ReviewForm;
