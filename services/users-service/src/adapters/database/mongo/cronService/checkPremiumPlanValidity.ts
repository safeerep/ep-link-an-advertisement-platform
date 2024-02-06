import cron from 'node-cron';
import { userCollection } from '..';

export default () => {
    cron.schedule('0 0 * * *', async () => {
    
        const oneYearAgo = new Date()
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    
        // updating premium membership to false for the users who took subscription policy before one year ago
        await userCollection.updateMany(
            {
                'subscription.takenOn': {
                    $lte: oneYearAgo
                },
                'subscription.policy': 'annual',
                premiumMember: true
            }, {
                premiumMember: false
            }
            )
            
        // updating premium membership to false for the users who took subscription policy before one month ago
        await userCollection.updateMany(
            {
                'subscription.takenOn': {
                    $lte: oneMonthAgo
                },
                'subscription.policy': 'monthly',
                premiumMember: true
            }, {
                premiumMember: false
            }
        )
    })
}