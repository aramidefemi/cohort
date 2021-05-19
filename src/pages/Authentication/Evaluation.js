import React, { useState, useEffect } from 'react';
import AuthWrapper from './Components/AuthWrapper';
import { Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, message, Input, Button, Radio, Result } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Select } from 'antd';

const { Option } = Select;
const { Step } = Steps;
const Evaluation = () => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [uploading, setUploading] = useState('No File Selected');
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
                  prev={prev}
                  state={data}
                  handleChangeEvaluation={handleChangeEvaluation}
                />
              }
            />
            <Step title="Health Plan Estimate"  description={<EvaluationRates step={current} next={next} />} />

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
  const optionsWithDisabled = [
    { label: 'For an Individual', value: 'Individual' },
    { label: 'For a Family', value: 'Family' },
    { label: 'For a Group', value: 'Group' },
    { label: 'For a Company', value: 'Company' },
  ];
  if (step !== 0) return null;
  return (
    <div className="WhoHasIt">
      <div className="radios">
        <Radio.Group
          name="0"
          options={optionsWithDisabled}
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

const EvaluationRates = ({ step, next }) => {
  if (step !== 2) return null;
  return (
    <Result
      status="success"
      title="Health Evaluation Successful"
      subTitle="We recommend our health care plan of 5,110 Naira only monthly"
      extra={[
        <Button className="btn primary btn-sm " onClick={next} key="console">
          Get Started
        </Button>,
      ]}
    />
  );
};

const SignUpForm = ({ handleChange, handleClick, step }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState('No File Selected');
  const props = {
    name: 'file',
    action: 'https://my-cohort-api.herokuapp.com/image-upload',
    onChange(info) {
      setUploading(info.file.status);
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      const res = { ...info.file.response };
      const path = { ...res.url };
      handleChange({
        target: {
          name: 'profile_url',
          value: 'https://my-cohort-api.herokuapp.com/' + path.path,
        },
      });
    },
  };
  if (step !== 3) return null;
  return (
    <div className="form">
      <div className="profile-photo">
        <Upload {...props}>
          <div className="form-group">
            <label htmlFor="">Upload Image</label>
            <Input disabled value={uploading} />
            <button className="btn primary">Choose..</button>{' '}
          </div>
        </Upload>
      </div>
      <br />
      <div className="col">
        <div className="form-group">
          <label htmlFor="">Email address</label>
          <Input
            placeholder="Email address"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Full name</label>
          <Input
            placeholder="Full name"
            name="fullname"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label htmlFor="">Password</label>
          <Input.Password
            placeholder="Password"
            name="password"
            onChange={handleChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Phone number</label>
          <Input
            placeholder="Phone number"
            name="phone"
            onChange={handleChange}
          />
        </div>
      </div>
      <br />
      <br />
      <br />

      <div className="profile-photo">
        <Button
          loading={loading}
          onClick={handleClick}
          className="btn primary btn-block"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};
const EvaluationForm = ({ state, step, next, handleChangeEvaluation }) => {
  const [question, setQuestion] = useState(null);
 
  useEffect(() => {
      const starting = state['0'] === 'Group' ? '16' : state['0'] === 'Family' ? '14' : '0a';
      setQuestion(starting) 
  }, [state['0']]); 

  const handleNextAnswer = () => {
    const value = state[question];
    console.log('state', state, value);
    const obj = questions[question];
    if (obj.final) {
      next();
    } else {
      const destination = obj.options ? obj.answerOptions[value] : obj.next;
      setQuestion(destination);
    }
  };
   
  if (step !== 1) return null;
  if (state['0'] === 'Company') return <ForCompany />;
  const inputType = {
    input: (
      <Input 
        name={question}
        onChange={handleChangeEvaluation}
      />
    ),
    select: (
      <Select
        style={{ width: '100%' }}
        onChange={(value) =>
          handleChangeEvaluation({
            target: { name: question, value },
          })
        }
      >
        {questions[question]?.values?.map((i, key) => (
          <Option key={key} value={i}>
            {i}
          </Option>
        ))}
      </Select>
    ),
  };
  if (!questions[question]?.name) return (<>{next()}</>);

  return (
    <div className="questions">
      <br />
      <h4>{questions[question]?.name}</h4>
      <br />

      {inputType[questions[question]?.type]}

      <Button className="btn primary btn-sm " onClick={handleNextAnswer}>
        Submit
      </Button>
    </div>
  );
};

const questions = {
  '0a': {
    name: 'Are you married',
    values: ['yes', 'no'],
    type: 'select',
    options: true,
    answerOptions: {
      yes: '0b',
      no: '1',
    },
  },
  '0b': {
    name: 'how long have you been married',
    type: 'input',
    options: false,
    next: '1',
  },
  '1': {
    name: 'Gender',
    values: ['female', 'male'],
    type: 'select',
    options: true,
    answerOptions: {
      female: '1b',
      male: '2',
    },
  },
  '1b': {
    name: 'Are you planning to have kids in the next 12 months',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '1c',
  },
  '1c': {
    name: 'Are you a nursing mother',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '2',
  },
  '2': {
    name: 'Have you been to the dentist/optician in the last 12 months',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '3a',
  },
  '3a': {
    name: 'Have you treated for Asthma in the last 12 months',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '3b',
  },
  '3b': {
    name: 'Have you treated for Hypertension in the last 12 months',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '3c',
  },
  '3c': {
    name: 'Have you treated for Ulcer in the last 12 months',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '3d',
  },
  '3d': {
    name: 'Have you treated for Sickle cell in the last 12 months',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '3e',
  },
  '3e': {
    name: 'Have you treated for Diabetes in the last 12 months',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '3f',
  },
  '3f': {
    name:
      'Have you treated for Epilepsy or seizure disorders in the last 12 months',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '4',
  },
  '4': {
    name: 'what is your blood group?',
    values: ['A', 'B', 'O', 'AB'],
    type: 'select',
    options: false,
    next: '5',
  },
  '5': {
    name: 'what is your blood group?',
    values: ['AA', 'AS', 'SS', 'AC', 'SC'],
    type: 'select',
    options: false,
    next: '6',
  },
  '6': {
    name: 'Are you currently managing any chronic health conditions?',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '7',
  },
  '7': {
    name: 'Are you currently on any medications',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '8',
  },
  '8': {
    name: 'Do you have any drug allergies?',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '9',
  },
  '9': {
    name: 'Have you had any surgery in the past 12 months?',
    values: ['yes', 'no'],
    type: 'select',
    options: true,
    answerOptions: {
      yes: '9a',
      no: '10',
    },
  },
  '9a': {
    name: 'Duration of time spent in the hospital in days',
    values: ['<5', '6-10', '11-20', '>20'],
    type: 'select',
    options: false,
    next: '9b',
  },
  '9b': {
    name: 'Any complications from previous surgery',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '9c',
  },
  '9c': {
    name: 'Were symptoms relieved after procedure',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '9d',
  },
  '9d': {
    name: 'Are you still receiving treatment for the procedure',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '10',
  },
  '10': {
    name: 'Any known allergies?',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '11',
  },
  '11': {
    name: 'Have you visited any specialist in the last 12 months',
    values: ['yes', 'no'],
    type: 'select',
    options: true,
    answerOptions: {
      yes: '11a',
      no: '12',
    }, 
  },
  '11a': {
    name: 'Mention the specialist visited',
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    next: '11',
  },
  '12': {
    name: 'What\'s your average monthly income',
    values: ['<50k', '51-100K', '101k-250K', '>250K'],
    type: 'select',
    options: false,
    next: '13',
  },
  '13': {
    name: 'How old are you?',
    values: ['18-24', '25-38', '39-54', '>55'],
    type: 'select',
    options: false,
    final: true, 
  },
  '14': {
    name: 'Marital status',
    values: ['Married', 'Single'],
    type: 'select',
    options: false,
    final: false, 
    next: '15a'
  },
  '15a': {
    name: 'Number of dependents', 
    type: 'input',
    options: false,
    final: false, 
    next: '15b'
  },
  '15b': {
    name: 'Any dependent/child within the ages 0 -18 yrs',
    values: ['yes', 'no'],
    type: 'select',
    options: true,
    final: false,  
    answerOptions: {
      yes: '15c',
      no: '0b',
    }, 
  },
  '15c': {
    name: 'Retrieving data. Wait a few seconds and try to cut or copy again.',
    type: 'input',
    options: false,
    next: '0b',
  }, 
  '16': {
    name: 'Group Number',
    values: ['<10', '10-20','21-50','51-100','101-250','251-500','501-750','751-1000', '>1000'],
    type: 'select',
    options: false,
    final: false,
    next: '17',
  },
  '17': {
    name: 'Number of females', 
    type: 'input',
    options: false,
    final: false, 
    next: '18'
  },
  '18': {
    name: 'Number of Males', 
    type: 'input',
    options: false,
    final: false, 
    next: '19a'
  },
  '19a': {
    name: 'Select the care package that best suits your group, Dental care?', 
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    final: false, 
    next: '19b'
  },
  '19b': {
    name: 'Optical care?', 
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    final: false, 
    next: '19c'
  },
  '19c': {
    name: 'Prostrate/Cervical care?', 
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    final: false, 
    next: '19d'
  },
  '19d': {
    name: 'Procedures?', 
    values: ['minor', 'intermediate', 'major'],
    type: 'select',
    options: false,
    final: false, 
    next: '19e'
  },
  '19e': {
    name: 'Diabetes/Asthma/Ulcer/Sickle cell/Seizure disorder?', 
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    final: false, 
    next: '19f'
  },
  '19f': {
    name: 'Dietician?', 
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    final: false, 
    next: '19g'
  },
  '19g': {
    name: 'Gym?', 
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    final: false, 
    next: '19h'
  },
  '19h': {
    name: 'Chronic Treatment?', 
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    final: false, 
    next: '19i'
  },
  '19i': {
    name: 'Specialist consultation?', 
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    final: false, 
    next: '19j'
  },
  '19j': {
    name: 'Inpatient care?', 
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    final: false, 
    next: '19k'
  },
  '19k': {
    name: 'Maternity care?', 
    values: ['yes', 'no'],
    type: 'select',
    options: false,
    final: false, 
    next: '19l'
  },
  '19l': {
    name: 'Other interest', 
    type: 'input',
    options: false,
    final: true,
    next: '1',
  },
};
export default Evaluation;
