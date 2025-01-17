export const getTokenByService = (service, storeId) => {
    let store = {
          token: process.env.NEXT_PUBLIC_MYCRM_TOKEN,
        };
    
        if (service === 'prom') {
        
          const STORES = {
            AvtoKlan: { token: process.env.NEXT_PUBLIC_AVTOKLAN_TOKEN,    
            },
            AutoAx: { token: process.env.NEXT_PUBLIC_AUTOAX_TOKEN,    
            },
            iDoAuto: { token: process.env.NEXT_PUBLIC_IDOAUTO_TOKEN,    
            },
            ToAuto: { token: process.env.NEXT_PUBLIC_TOAUTO_TOKEN,    
            },
          }
          
          store = STORES[storeId];
        }
    return store;
}