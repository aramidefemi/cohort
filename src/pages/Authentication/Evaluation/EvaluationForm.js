import React, { useState, useEffect } from 'react';
import { Input, Button, Radio } from 'antd';
import { questions } from './data';

const EvaluationForm = ({ state, step, back, next, handleChangeEvaluation }) => {
  const [question, setQuestion] = useState(null);
  const [prev, setPrev] = useState('0');

  useEffect(() => {
    const starting =
      state['0'] === 'Group' ? '16' : state['0'] === 'Family' ? '14' : '0a';
    setQuestion(starting);
  }, [state['0']]);

  const handlePrevAnswer = () => {
    prev === '0' ? back() : setQuestion(prev);
  };

  const handleNextAnswer = () => {
    const value = state[question];
    console.log('state', state, value);
    const obj = questions[question];
    if (obj.final) {
      next();
    } else {
      setPrev(question);
      const destination = obj.options ? obj.answerOptions[value] : obj.next;
      setQuestion(destination);
    }
  };

  if (step !== 1) return null;
  if (state['0'] === 'Company') return <ForCompany />;
  const inputType = {
    input: () => <Input name={question} onChange={handleChangeEvaluation} />,
    select: () => {
      const options = questions[question]?.values?.map((label) => {
        return { label, value: label };
      });
      return (
        <div className="radios">
          <Radio.Group
            name={question}
            options={options}
            direction="vertical"
            onChange={handleChangeEvaluation}
          />
        </div>
      );
    },
  };
  if (!questions[question]?.name) return <>{next()}</>;

  return (
    <div className="questions">
      <br />
      <h4>{questions[question]?.name}</h4>

      {inputType[questions[question]?.type]()}
      <div className='flex'>
       
      <Button className="btn primary btn-sm " onClick={handleNextAnswer}>
        Submit
      </Button>   <Button type="link" onClick={handlePrevAnswer}>
        Back
      </Button>
      </div>
    
    </div>
  );
};
const ForCompany = () => {
  return (
    <div className="questions">
      <h4>Please contact the admin for an estimate.</h4>
      <div className="form-group">
        <label htmlFor="">Fullname</label>
        <Input placeholder="Fullname" />
      </div>
      <div className="form-group">
        <label htmlFor="">Email address</label>
        <Input placeholder="Email address" />
      </div>

      <Button className="btn primary btn-sm ">Submit</Button>
    </div>
  );
};

export default EvaluationForm;
