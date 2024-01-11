"use state";

import { InputField } from "../Styles/Components/InputFields";

const Newsletter = () => {
  return (
    <section style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <h2>Join our newsletter:</h2>
      <InputField
        bgcolor="--Light"
        textcolor="--Dark"
        fontSize="1rem"
        type="email"
        placeholder="Your email..."
      />
    </section>
  );
};

export default Newsletter;
