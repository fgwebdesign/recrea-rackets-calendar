import { supabase } from './supabase';

export const auth = {
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    return session;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      return false;
    }

    // Clear local storage
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    return true;
  },

  getToken() {
    return supabase.auth.getSession().then(({ data: { session } }) => {
      return session?.access_token || null;
    });
  },

  isAuthenticated() {
    return this.getSession().then((session) => !!session);
  },
};
