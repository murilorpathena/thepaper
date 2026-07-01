export function calculateViralScore(
  sourceReputation: number,
  categoryTrending: number,
  headlinePower: number,
  recency: number
): number {
  const weights = {
    sourceReputation: 0.25,
    categoryTrending: 0.35,
    headlinePower: 0.25,
    recency: 0.15,
  };

  return Math.round(
    sourceReputation * weights.sourceReputation +
      categoryTrending * weights.categoryTrending +
      headlinePower * weights.headlinePower +
      recency * weights.recency
  );
}

export function getViralLabel(score: number): string {
  if (score >= 90) return "🔥 Viral";
  if (score >= 75) return "📈 Alto potencial";
  if (score >= 50) return "👍 Médio";
  return "👀 Moderado";
}