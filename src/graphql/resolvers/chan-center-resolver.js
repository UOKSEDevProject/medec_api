import {ChanCenterModel} from "../../database/models/chan-center-model.js";

export const chanCenterResolver = {
    Query: {
        getChannelCenters: async () => {
            let channelCenters = await ChanCenterModel.find({});
            return channelCenters;
        },
        getChannelCenterById: async (_, args) => {
            let channelCenter = await ChanCenterModel.findById(args.id);
            return channelCenter;
        }
    },

    Mutation: {
        addChannelCenter: async (_, args) => {
            let chanCenter = {
                name: args.chanCenter.name,
                address: args.chanCenter.address,
                logoUrl: args.chanCenter.logoUrl,
                cntNo: args.chanCenter.cntNo
            }

            let created = await ChanCenterModel.create(chanCenter);
            return created;
        }
    }
}