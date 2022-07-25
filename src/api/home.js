import adminReq from '@/utils/request-admin'

export function viewCount2DB(){
    return adminReq({
        url: '/home/redis/view_count2db',
        method: 'GET'
    });
}