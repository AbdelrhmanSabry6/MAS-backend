import Client from "../../databases/models/client.model.js";
import AppError from "../../utils/AppError.js";

export const createClient = async (data) => {
    const client = new Client(data);
    await client.save();

    return await Client.findById(client._id).populate("logoId");
};

export const updateClient = async (id, data) => {
    const client = await Client.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).populate("logoId");

    if (!client) {
        throw new AppError("Client not found", 404);
    }

    return client;
};

export const deleteClient = async (id) => {
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
        throw new AppError("Client not found", 404);
    }

    return client;
};

export const getAllClients = async () => {
    return await Client.find()
        .populate("logoId")
        .sort({ sortOrder: 1, createdAt: -1 });
};

export const getClientById = async (id) => {
    const client = await Client.findById(id).populate("logoId");

    if (!client) {
        throw new AppError("Client not found", 404);
    }

    return client;
};