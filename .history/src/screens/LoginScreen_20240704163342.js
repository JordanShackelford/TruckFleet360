const handleLogin = async () => {
  setIsLoading(true);
  console.log('Attempting login with:', email, password);
  try {
    console.log('Sending request to:', `${API_URL}/api/login`);
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    if (data.success) {
      console.log('Login successful:', data.token);
      navigation.replace('Main');
    } else {
      console.log('Login failed:', data.message);
      Alert.alert('Login Failed', data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    Alert.alert('Error', 'An unexpected error occurred');
  } finally {
    setIsLoading(false);
  }
};