const handleLogin = async () => {
  setIsLoading(true);
  console.log('Attempting login with:', email, password);
  try {
    console.log('Sending request to:', `${API_URL}/api/login`);
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), 10000); // Timeout after 10 seconds
    });

    const fetchPromise = fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response) {
      throw new Error('Request timed out');
    }

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error('Server responded with error status');
    }

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
    if (error.message === 'Request timed out') {
      Alert.alert('Error', 'Request timed out. Please try again later.');
    } else if (error.message === 'Server responded with error status') {
      Alert.alert('Error', 'Server responded with an error status. Please try again later.');
    } else {
      Alert.alert('Error', 'Failed to connect to the server. Please check your network connection.');
    }
  } finally {
    setIsLoading(false);
  }
};
