// src/contexts/GroupContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../auth';

const GroupContext = createContext();

export function GroupProvider({ children }) {
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        // Get or create user's group (same logic as before)
        const { data: existing } = await supabase
          .from('group_members')
          .select('group_id')
          .eq('user_id', user.id)
          .limit(1);

        if (existing && existing.length > 0) {
          setCurrentGroupId(existing[0].group_id);
        } else {
          // Create new group for first-time user
          const { data: newGroup } = await supabase
            .from('groups')
            .insert([{ name: `${user.email.split('@')[0]}'s Group` }])
            .select('id')
            .single();

          if (newGroup) {
            await supabase
              .from('group_members')
              .insert([{ group_id: newGroup.id, user_id: user.id }]);
            
            setCurrentGroupId(newGroup.id);
          }
        }
      } catch (err) {
        console.error('Failed to load group:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, []);

  return (
    <GroupContext.Provider value={{ currentGroupId, loading }}>
      {children}
    </GroupContext.Provider>
  );
}

export const useGroup = () => useContext(GroupContext);