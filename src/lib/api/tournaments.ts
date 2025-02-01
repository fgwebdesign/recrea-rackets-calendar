// Crear un servicio separado para las llamadas a la API
export const tournamentService = {
  async getUpcomingTournaments(): Promise<Tournament[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.filter((tournament: Tournament) => tournament.status === 'upcoming');
  }
}; 