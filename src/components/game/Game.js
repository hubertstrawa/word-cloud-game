import { useState } from 'react';
import { Card, Badge, PageHeader, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import GameDrawer from '../game_drawer/Drawer';
import { useSelector } from 'react-redux';

const Game = () => {
  const [clickedWords, setClickedWords] = useState([]);
  const [answers, setAnswers] = useState({
    good: [],
    bad: [],
  });
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [shouldShowBadge, setShouldShowBadge] = useState(false);
  const navigate = useNavigate();
  const { category: data, player } = useSelector((state) => state.game);

  console.log('player', player);

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const wordClick = (w, i) => {
    if (!shouldShowBadge) {
      if (!clickedWords.includes(w)) {
        setClickedWords([...clickedWords, w]);
        return;
      }
      const existingArr = [...clickedWords];
      const filtered = existingArr.filter((wo) => wo !== w);
      setClickedWords(filtered);
    }
  };

  const submitHandler = () => {
    setShouldShowBadge(true);
    setIsDrawerVisible(true);
    const goodSubmittedAnswers = clickedWords.filter((selectedWord) => {
      return [...data.good_words].find((goodWord) => goodWord === selectedWord);
    });
    const badSubmittedAnswers = clickedWords.filter((selectedWord) => {
      return !goodSubmittedAnswers.includes(selectedWord);
    });
    setAnswers({
      ...answers,
      good: goodSubmittedAnswers,
      bad: badSubmittedAnswers,
    });
  };

  const badWordsTotal =
    answers && data ? data.good_words.length - answers.good.length : null;
  const score = answers
    ? answers.good.length * 2 - (answers.bad.length + badWordsTotal)
    : null;
  const maxScore = data ? data.good_words.length * 2 - (0 + 0) : null;

  return (
    <section>
      <PageHeader
        className='site-page-header'
        onBack={() => navigate('/')}
        title={data.question}
      />
      <Row style={{ padding: '16px 24px' }} gutter={[16, 16]}>
        {data.all_words.map((word) => {
          const isActive = clickedWords.includes(word);
          return (
            <Col key={word} span='8'>
              <Badge.Ribbon
                style={{
                  display: isActive && shouldShowBadge ? 'block' : 'none',
                }}
                text={answers.good.includes(word) ? 'Good' : 'Bad'}
                color={answers.good.includes(word) ? 'green' : 'red'}
              >
                <Card
                  hoverable
                  style={{
                    borderRadius: 8,
                    backgroundColor: isActive ? '#f0eded' : 'white',
                  }}
                  onClick={() => wordClick(word)}
                >
                  {word}
                </Card>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Button
          onClick={submitHandler}
          disabled={clickedWords.length < 1}
          size={'large'}
          style={{ width: '40%', margin: '1rem auto' }}
        >
          Check answers
        </Button>
      </Row>
      <GameDrawer
        isDrawerVisible={isDrawerVisible}
        handleCloseDrawer={handleCloseDrawer}
        score={score}
        maxScore={maxScore}
        goodAnswers={answers.good}
        badAnswers={answers.bad}
        clickedWords={clickedWords}
      />
    </section>
  );
};

export default Game;
