import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Videos from "./pages/Videos";
import Goals from "./pages/Goals";
import Apps from "./pages/Apps";
import NotFound from "./pages/NotFound";
import News from "./pages/News";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/videos"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Videos />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/metas"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Goals />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/noticias"
              element={
                <Layout>
                  <News />
                </Layout>
              }
            />
            <Route
              path="/apps"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Apps /> {}
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/simulador"
              element={
                <Layout>
                  <ProtectedRoute>
                    <div className="container py-12">
                      <h1 className="text-4xl font-bold mb-4">Simulador de Investimentos</h1>
                      <p className="text-muted-foreground">Em desenvolvimento - Sprint 2</p>
                    </div>
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
