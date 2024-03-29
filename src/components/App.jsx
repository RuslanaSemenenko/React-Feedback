import React, { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import './App.css';

export default function App() {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const { good } = feedback;
    const percentage = (good * 100) / total;
    return Math.round(percentage);
  };

  const onLeaveFeedback = option => {
    setFeedback(prevState => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  const options = Object.keys(feedback);

  return (
    <div className="app-container">
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      {total === 0 ? (
        <Notification message="No feedback given" />
      ) : (
        <Section title="Statistics">
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      )}
    </div>
  );
}
