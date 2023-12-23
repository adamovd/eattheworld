import styled from "styled-components";

export const DropdownSelect = styled.select`
  appearance: none;
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;
  min-width: 15ch;
  max-width: 30ch;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  padding: 0.5rem 0.9375rem 0.375rem 0.9375rem;
  gap: 0.625rem;
  border-radius: 1.25rem;
  box-shadow: 2px 4px 0px 0px var(--Dark);
  background: var(--Yellow);
  color: var(--Dark);
  text-align: center;
  font-family: var(--Text);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.125rem;
  z-index: 1;

  &::-ms-expand {
    display: none;
  }
  select,
  &::after {
    grid-area: select;
  }
`;

export const DropdownOption = styled.option`
  appearance: none;
  display: flex;
  padding-top: 0.1875rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  background: var(--Yellow);
  color: var(--Dark);
  text-align: center;
  font-family: var(--Text);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.125rem;
`;
