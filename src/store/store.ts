import {create} from 'zustand';
import type { DraftPatient, Patient } from '../types';
import { v4 as uid } from 'uuid';

type PatientState = {
    patients: Patient[]
    addPatient: (data: DraftPatient) => void
    deletePatient: (id:Patient['id']) => void
}

const createPatient = (patient: DraftPatient): Patient => {
    return {
        ...patient,
        id: uid()
    }
}

export const usePatientStore = create<PatientState>((set)=> ({
    patients: [],
    addPatient: (data) => {
        const newPatient = createPatient(data)
        set((state) => ({
            patients: [...state.patients, newPatient]
        }))
    },
    deletePatient: (id) => {
        set((state) => ({
            patients : state.patients.filter(patient => patient.id !== id)
        }))
    }
}))