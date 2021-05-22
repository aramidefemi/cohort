import React, { useState } from 'react';
import AuthWrapper from '../Components/AuthWrapper';
import { Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Radio, Result } from 'antd';
import { typeOptions } from './data';
import SignUpForm from './SignUpForm';
import EvaluationForm from './EvaluationForm';

const { Step } = Steps;
const Evaluation = () => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({}); 
  const dispatch = useDispatch();
  const handleClick = () => {
    setLoading(!loading);
    setTimeout(() => setLoading(false), 5000);
    dispatch({
      type: 'SIGN_UP',
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setLoading(false);
    const form = {};
    form[name] = value;
    dispatch({
      type: 'HANDLE_CHANGE',
      payload: form,
    });
  };

  const handleChangeEvaluation = ({ target: { name, value } }) => {
    const foo = {};
    foo[name] = value;

    const newData = { ...data, ...foo };
    setData(newData);
    handleChange({ target: { name: 'data', value: newData } });
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <AuthWrapper>
      <div className="container registration">
        <h2>
          Evaluation Form
          <br />
          <small>
            Please enter your details below. This should only take a couple of
            minutes.
          </small>
        </h2>
        <div className="form">
          <Steps
            direction="vertical"
            progressDot
            size="small"
            current={current}
          >
            <Step
              title="Who are you planning for?"
              description={
                <WhoHasIt
                  next={next}
                  step={current}
                  handleChangeEvaluation={handleChangeEvaluation}
                  prev={prev}
                />
              }
            />
            <Step
              title="Health Plan Evaluation"
              description={
                <EvaluationForm
                  next={next}
                  step={current}
                  back={prev}
                  state={data}
                  handleChangeEvaluation={handleChangeEvaluation}
                />
              }
            />
            <Step
              title="Health Plan Estimate"
              description={<EvaluationRates step={current} next={next} />}
            />

            <Step
              title="Create Account"
              description={
                <SignUpForm
                  next={next}
                  step={current}
                  handleChange={handleChange}
                  handleClick={handleClick}
                  prev={prev}
                />
              }
            />
          </Steps>
        </div>
      </div>
    </AuthWrapper>
  );
};
const WhoHasIt = ({ step, handleChangeEvaluation, next }) => {
  if (step !== 0) return null;
  return (
    <div className="WhoHasIt">
      <div className="radios">
        <Radio.Group
          name="0"
          options={typeOptions}
          direction="vertical"
          onChange={handleChangeEvaluation}
        />
      </div>

      <Button onClick={next} className="btn primary btn-sm ">
        Next
      </Button>
    </div>
  );
};

const EvaluationRates = ({ step, next }) => {
  if (step !== 2) return null;
  return (
    <Result
      status="success"
      title="Health Evaluation Successful"
      subTitle="We recommend our health care plan of 3750.00 Naira only monthly"
      extra={[
        <Button className="btn primary btn-sm " onClick={next} key="console">
          Get Started
        </Button>,
      ]}
    />
  );
};




export default Evaluation;
