import { Statistic, Progress, Tooltip, Drawer, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GameDrawer = ({
  handleCloseDrawer,
  isDrawerVisible,
  score,
  maxScore,
  goodAnswers,
  badAnswers,
  clickedWords,
}) => {
  const { player } = useSelector((state) => state.game);
  const navigate = useNavigate();

  const playAgainHandler = () => {
    navigate('/');
  };
  return (
    <Drawer
      title='Your Score'
      placement='right'
      onClose={handleCloseDrawer}
      visible={isDrawerVisible}
    >
      {score > 0 ? (
        <p>Contagrulations, {player}!</p>
      ) : (
        <p>Oh shit {player}, try again.</p>
      )}
      <Statistic
        title='Score'
        value={`${score} `}
        suffix={`/ ${maxScore} points`}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tooltip
          title={`${clickedWords.length} clicked in total / ${goodAnswers.length} good answers / ${badAnswers.length} bad answers`}
        >
          <Progress
            size='large'
            style={{ marginTop: '1.5rem' }}
            status={score < 0 && 'exception'}
            percent={Math.round((score / maxScore) * 100)}
            type='circle'
          />
        </Tooltip>
      </div>
      <Button
        onClick={playAgainHandler}
        size='large'
        style={{ width: '100%', marginTop: '5rem' }}
      >
        Play again
      </Button>
    </Drawer>
  );
};

export default GameDrawer;
