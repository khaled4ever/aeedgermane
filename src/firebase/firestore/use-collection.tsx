'use client';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, type Query } from 'firebase/firestore';
import { useFirestore } from '../provider';

export function useCollection<T>(collectionName: string) {
  const db = useFirestore();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!db) {
        // Firestore instance might not be ready on initial render.
        setLoading(true);
        return;
    };

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const items: T[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as any);
        });
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching collection ${collectionName}:`, err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, collectionName]);

  return { data, loading, error };
}
