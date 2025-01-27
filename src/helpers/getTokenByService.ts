
export const getTokenByService = (service: 'prom' | 'myApp', storeId: string) => {
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
          
          // Перевіряємо, чи є storeId ключем об'єкта STORES
    if (storeId in STORES) {
      store = STORES[storeId as keyof typeof STORES]; // Вказуємо TypeScript, що storeId точно є ключем
    }
        }
    return store;
}