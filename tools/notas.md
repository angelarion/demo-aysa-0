Primer paso:

1. Aplicar el rbac.yml
2. habilitar los :

        oc create clusterrole interceptorsview --verb=get,list,watch --resource=clusterinterceptors
        oc adm policy add-cluster-role-to-user interceptorsview system:serviceaccount:<project_name>:<serviceaccount_name>
        
        Sirven para validar los pasos anteriores.
        
        oc auth can-i get clusterinterceptors --as system:serviceaccount:<project_name>:<serviceaccount_name>
        oc auth can-i watch clusterinterceptors --as system:serviceaccount:<project_name>:<serviceaccount_name>
        oc auth can-i list clusterinterceptors --as system:serviceaccount:<project_name>:<serviceaccount_name>
  3. Crear el secret.yml
  4. Crear el  EventLissener
  
  

