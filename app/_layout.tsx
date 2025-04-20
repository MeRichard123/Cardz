import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="modal/camera" 
        options={{ 
          presentation: 'modal',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="modal/card/[id]" 
        options={{ 
          presentation: 'modal',
          headerShown: false
        }}
      />
    </Stack>
  )
}
