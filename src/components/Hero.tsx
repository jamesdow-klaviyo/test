import { Grid, Column, Button } from "@carbon/react";
import "./Hero.scss";

export function Hero() {
  return (
    <section className="hero">
      <Grid fullWidth className="hero__grid">
        <Column lg={16} md={8} sm={4} className="hero__content">
          <h1 className="hero__title">Hello World!</h1>
          <p className="hero__description">
            Uncover the 5 key predictions that will define tomorrow's AI-first
            business models and get a head start to the next-gen competitive
            advantage.
          </p>
          <div className="hero__actions">
            <Button kind="primary" size="lg" href="#">
              Read the enterprise in 2030 report
            </Button>
            <Button kind="secondary" size="lg" href="#">
              See how AI reshapes smarter businesses
            </Button>
          </div>
        </Column>
      </Grid>
    </section>
  );
}
