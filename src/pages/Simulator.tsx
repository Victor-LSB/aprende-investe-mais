// src/pages/Simulator.tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator } from 'lucide-react';

// Define a estrutura dos dados que vamos usar no gráfico
interface ChartData {
  year: number;
  value: number;
  totalInvested: number;
}

const Simulator = () => {
  // Estados para controlar os campos do formulário
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(200);
  const [interestRate, setInterestRate] = useState(8); // Taxa anual
  const [period, setPeriod] = useState(10); // Período em anos

  // Estado para armazenar os resultados do cálculo
  const [results, setResults] = useState<{
    chartData: ChartData[];
    totalInvested: number;
    totalInterest: number;
    finalAmount: number;
  } | null>(null);

  // Função para formatar números como moeda brasileira
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // O coração do simulador: a lógica de juros compostos
  const calculateCompoundInterest = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = period * 12;
    let currentValue = initialInvestment;
    const chartData: ChartData[] = [];

    for (let month = 1; month <= totalMonths; month++) {
      // Adiciona o aporte mensal antes de calcular o juro do mês
      currentValue += monthlyInvestment;
      // Calcula o juro do mês
      currentValue *= (1 + monthlyRate);

      // Adiciona um ponto no gráfico a cada ano
      if (month % 12 === 0) {
        chartData.push({
          year: month / 12,
          value: parseFloat(currentValue.toFixed(2)),
          totalInvested: initialInvestment + monthlyInvestment * month,
        });
      }
    }
    
    // Adiciona o ponto inicial (ano 0) para o gráfico
    const initialChartData = {
        year: 0,
        value: initialInvestment,
        totalInvested: initialInvestment,
    };

    const totalInvested = initialInvestment + monthlyInvestment * totalMonths;
    const finalAmount = currentValue;
    const totalInterest = finalAmount - totalInvested;

    setResults({
      chartData: [initialChartData, ...chartData],
      totalInvested,
      totalInterest,
      finalAmount,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCompoundInterest();
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Simulador de Investimentos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Projete o crescimento do seu patrimônio com juros compostos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seção do Formulário */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Parâmetros</CardTitle>
                <CardDescription>Ajuste os valores para simular.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="initial">Valor Inicial (R$)</Label>
                    <Input id="initial" type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthly">Aporte Mensal (R$)</Label>
                    <Input id="monthly" type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Taxa de Juros Anual (%)</Label>
                    <div className="flex items-center gap-2">
                        <Input id="rate" type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-24" />
                        <Slider value={[interestRate]} onValueChange={(val) => setInterestRate(val[0])} max={20} step={0.5} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="period">Período (Anos)</Label>
                    <div className="flex items-center gap-2">
                        <Input id="period" type="number" value={period} onChange={(e) => setPeriod(Number(e.target.value))} className="w-24" />
                        <Slider value={[period]} onValueChange={(val) => setPeriod(val[0])} max={40} step={1} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Simular
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Seção dos Resultados */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Resultados da Simulação</CardTitle>
                <CardDescription>Veja a projeção do seu investimento ao longo do tempo.</CardDescription>
              </CardHeader>
              <CardContent>
                {!results ? (
                  <div className="text-center py-20">
                    <Calculator className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Preencha os dados e clique em "Simular" para ver os resultados.</p>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Valor Final Bruto</p>
                        <p className="text-2xl font-bold text-accent">{formatCurrency(results.finalAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Investido</p>
                        <p className="text-2xl font-bold">{formatCurrency(results.totalInvested)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total em Juros</p>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(results.totalInterest)}</p>
                      </div>
                    </div>
                    
                    <div className="h-80 w-full">
                      <ResponsiveContainer>
                        <LineChart data={results.chartData} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" unit=" anos" />
                          <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                          <Tooltip formatter={(value) => formatCurrency(value as number)} />
                          <Line type="monotone" dataKey="value" name="Valor Acumulado" stroke="hsl(var(--primary))" strokeWidth={2} />
                          <Line type="monotone" dataKey="totalInvested" name="Total Investido" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;