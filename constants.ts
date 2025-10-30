
// FIX: Add import for React to use React types.
import React from 'react';
import { HardHatIcon, BoltIcon, FireIcon, FirstAidIcon, ErgonomicsIcon, ChemicalIcon } from './components/IconComponents';

export interface SafetyTopic {
  id: string;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const SAFETY_TOPICS: SafetyTopic[] = [
  { id: 'height', title: 'עבודה בגובה', icon: HardHatIcon },
  { id: 'electricity', title: 'בטיחות בחשמל', icon: BoltIcon },
  { id: 'fire', title: 'בטיחות אש', icon: FireIcon },
  { id: 'chemicals', title: 'חומרים מסוכנים', icon: ChemicalIcon },
  { id: 'ergonomics', title: 'ארגונומיה', icon: ErgonomicsIcon },
  { id: 'first_aid', title: 'עזרה ראשונה', icon: FirstAidIcon },
];
