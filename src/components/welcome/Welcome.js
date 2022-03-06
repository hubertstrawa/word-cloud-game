import { Button, Input, Row, Select } from 'antd';
import { useState } from 'react';
// const {useDispatch} from
import { gameActions } from '../../store/game-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MessageOutlined } from '@ant-design/icons';
import styles from './Welcome.module.css';

const data = [
  {
    question: 'Select animals',
    all_words: [
      'hole',
      'sofa',
      'pear',
      'tiger',
      'oatmeal',
      'square',
      'nut',
      'cub',
      'shirt',
      'tub',
      'passenger',
      'cow',
    ],
    good_words: ['tiger', 'cow'],
  },
  {
    question: 'Select cars',
    all_words: [
      'hole',
      'sofa',
      'pear',
      'toyota',
      'ford',
      'square',
      'nut',
      'cub',
      'shirt',
      'tub',
      'passenger',
      'cow',
    ],
    good_words: ['toyota', 'ford'],
  },
];

const Welcome = () => {
  const [playerName, setPlayerName] = useState('');
  const dispatch = useDispatch();
  const { player, categories } = useSelector((state) => state.game);
  const { Option } = Select;

  console.log('TESTTT', player);

  const playerNameHandler = (e) => {
    dispatch(gameActions.setPlayer(e.target.value));
  };

  const navigate = useNavigate();

  const startGameHandler = () => {
    // dispatch(gameActions.setPlayer(playerName));
    navigate('/game');
  };

  function handleChange(value) {
    const foundCategory = categories.find((singleCategory) => {
      return singleCategory.question === value;
    });
    console.log('foundCategory', foundCategory);
    dispatch(gameActions.chooseCategory(foundCategory));
  }

  return (
    <Row className={styles.container}>
      <h1>
        WordCloud Game <MessageOutlined />
      </h1>
      <Input
        placeholder='Enter your username'
        size='large'
        allowClear
        value={player}
        onChange={playerNameHandler}
        prefix={<UserOutlined className='site-form-item-icon' />}
      />
      <Select
        size='large'
        defaultValue={categories[0].question}
        style={{ width: '100%', marginTop: '1rem' }}
        onSelect={handleChange}
        onChange={handleChange}
      >
        {categories.map((single) => {
          return <Option value={single.question}>{single.question}</Option>;
        })}
      </Select>
      <Button
        onClick={startGameHandler}
        size={'large'}
        style={{ width: '40%', margin: '1rem auto' }}
        type='primary'
        disabled={!player}
      >
        Start game
      </Button>
    </Row>
  );
};

export default Welcome;
