
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8BD957',
        tabBarInactiveTintColor: '#849487',
        tabBarStyle: {
          backgroundColor: '#07150D',
          opacity: 1,
          borderTopWidth: 0,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 3,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="home"
              color={color}
              size={focused ? 23 : 21}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="dex"
        options={{
          title: 'My Dex',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="binoculars"
              color={color}
              size={focused ? 23 : 21}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="settings-outline"
              color={color}
              size={focused ? 23 : 21}
            />
          ),
        }}
      />
    </Tabs>
  );
}
