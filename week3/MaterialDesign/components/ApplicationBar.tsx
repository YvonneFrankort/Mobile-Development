import { Appbar } from 'react-native-paper';
import { StackHeaderProps } from '@react-navigation/stack';

export default function ApplicationBar({ navigation, back }: StackHeaderProps) {
  return (
    <Appbar.Header style={{ backgroundColor: 'green' }}>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <Appbar.Action
          icon="arrow-right"
          onPress={() => navigation.navigate('Second')}
        />
      )}

      <Appbar.Content title={back ? 'Second Screen' : 'Home'} />
    </Appbar.Header>
  );
}
