import {DoctorModel} from "../database/models/doctor-model.js";

export const createDoctor = async (doctor) => {
    return await DoctorModel.create(doctor);
}

export const findDoctorByMedicalCouncilNumber = async (id) => {
    return await DoctorModel.findById(id);
}