import { ThemeProvider } from './shared/presentation/contexts';
import { DashboardContainer } from './features/users';

function App() {
  return (
    <ThemeProvider>
      <DashboardContainer />
    </ThemeProvider>
  );
}

export default App;
