import { ThemeProvider } from './contexts/ThemeContext';
import { DashboardContainer } from './features/users';

function App() {
  return (
    <ThemeProvider>
      <DashboardContainer />
    </ThemeProvider>
  );
}

export default App;
