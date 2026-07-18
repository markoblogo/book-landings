import { LegalPage } from "@book-landings/landing-ui";
import { contactEmail, publisher } from "../../data/ecosystem";

export default function Legal() {
  return (
    <LegalPage title="Legal notice">
      <p>Publisher: {publisher}.</p>
      <p>Contact: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
      <p>Materials on this site are published for educational and operational use. They are not investment advice, do not constitute an offer, and do not make price forecasts or return claims.</p>
    </LegalPage>
  );
}
