import { db } from "@/config/firebase";
import { type ClassValue, clsx } from "clsx";
import { getGPUTier } from "detect-gpu";
import { get, ref } from "firebase/database";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ROUTES = new Map([
  ["/dashboard", "Início"],
  ["/report", "Denúncia"],
  ["/reports", "Denúncias"],
  ["/reports/create", "Fazer Nova Denúncia"],
  ["/authentication", "Autenticação"],
  ["/settings", "Configurações"],
  ["/statistics", "Minhas estatísticas"],
  ["/privacy-policy", "Política de Privacidade"],
  ["/terms-of-service", "Termos de Uso"],
  ["/team", "Minha Equipe"],
  ["/notificacoes", "Todas as Notificações"],
]);

export const INSTITUTION_CODES = new Map([
  ["oCQr0O4kJeWSzPBxmBtjm1KYjgk1", "LA INSTITUICION"],
  ["OXiUgDqEmN4Q", "Escola FERCA"],
]);

export const generateBreadcrumbLinks = (url: string): string[] => {
  const urlParts = url.split("/").filter(Boolean);
  let currentPath = "";

  return urlParts.map((part) => {
    currentPath += `/${part}`;
    return currentPath;
  });
};

export const isHardwareAccelerationEnabled = async () => {
  const gpuTier = await getGPUTier();
  return gpuTier.tier >= 2;
};

export const getSchoolNameFromCode = async (linkedSchool: string) => {
  const schoolRef = ref(db, `schools/${linkedSchool}`);
  const snapshot = await get(schoolRef);

  if (snapshot.exists()) {
    return snapshot.val().schoolName;
  } else {
    console.log("No such document!");
  }
};

export const getUserBySchoolCode = async (schoolCode: string) => {
  // Query the 'schools' database for the given code
  const schoolRef = ref(db, `schools/${schoolCode}`);
  const schoolSnapshot = await get(schoolRef);

  if (!schoolSnapshot.exists()) {
    console.log("No such school!");
    return;
  }

  // Retrieve the 'uid' field
  const uid = schoolSnapshot.val().uid;

  // Query the 'users' database for a user with that 'uid'
  const userRef = ref(db, `users/${uid}`);
  const userSnapshot = await get(userRef);

  if (userSnapshot.exists()) {
    return userSnapshot.val();
  } else {
    console.log("No such user!");
  }
};
