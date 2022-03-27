import { Row, Col, Accordion } from "react-bootstrap";
import styles from "./styles/FilterWrapper.module.css";
import { useContext, useState } from "react";
import FilterItem from "./FilterItem";
import OptionsSelect from "./OptionsSelect";
import LengthOptions from "./LengthOptions";
import DateOptions from "./DateOptions";
import TextInput from "./TextInput";
import AgeLimitOptions from "./AgeLimitOptions";
import { MovieContext } from "../../contexts/MovieContext";

const FilterWrapper = () => {
  const { setUserRequest } = useContext(MovieContext);

  const [toggleAccordion, setToggleAccordion] = useState(false);
  const icon = !toggleAccordion ? (
    <i className={`fas fa-search fa-lg`} />
  ) : (
    <i className={`fas fa-times fa-lg`} />
  );

  const filters = () => {
    return (
      <Row noGutters={true}>
        <Col xs={12}>
          <hr className={styles.lineBtwn}></hr>
        </Col>
        <Col xs={12} lg={9}>
          <TextInput inputType={"textSearch"} />
        </Col>
        <Col xs={12}>
          <hr className={styles.lineBtwn}></hr>
        </Col>
        <FilterItem heading={"Date"} component={<DateOptions />} />
        <FilterItem
          heading={"Price"}
          component={<OptionsSelect selectType={"price"} />}
        />
        <FilterItem
          heading={"Genre"}
          component={<OptionsSelect selectType={"genre"} />}
        />
        <FilterItem
          heading={"Actor"}
          component={<TextInput inputType={"actor"} />}
        />
        <FilterItem
          heading={"Director"}
          component={<TextInput inputType={"director"} />}
        />
        <FilterItem
          heading={"Language"}
          component={<OptionsSelect selectType={"language"} />}
        />
        <FilterItem heading={"Length"} component={<LengthOptions />} />
        <FilterItem heading={"Age"} component={<AgeLimitOptions />} />
        <Col xs={12}>
          <div className="d-flex justify-content-end mt-1">
            <button onClick={() => setUserRequest({})} className="resetButton">
              Clear search
            </button>
          </div>
        </Col>
      </Row>
    );
  };

  const getAccordion = () => {
    return (
      <div
        className={
          toggleAccordion ? styles.filterWrapper : styles.filterWrapperClosed
        }
      >
        <Accordion>
          <Accordion.Toggle
            as={"div"}
            eventKey="0"
            onClick={() => setToggleAccordion(!toggleAccordion)}
            className="mb-2 text-center"
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className={styles.filterHeading}>Search</span>
              <span>{icon}</span>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">{filters()}</Accordion.Collapse>
        </Accordion>
      </div>
    );
  };

  return <>{getAccordion()}</>;
};

export default FilterWrapper;
