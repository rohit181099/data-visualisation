import pandas as pd
import numpy as np
df=pd.DataFrame()
d_id=['VIM_2.4_'+str(i) for i in range(1,2001)]
df['DeviceId']=d_id
c_name=['A','B','C','D','E','F','G','H','I','J']*200
c_name =np.array(c_name)
np.random.shuffle(c_name)
df['Company_Name']=c_name
df['batteryVoltage']=np.random.rand(2000)+3
df['Rpm']=np.random.rand(2000)
lat=np.hstack((28.7041+ np.random.rand(500)*0.8-0.4,12.9716+ np.random.rand(500)*0.8-0.4,
17.3850+ np.random.rand(500)*0.8-0.4,22.5726+ np.random.rand(500)*0.8-0.4))
df['lattitude']=lat
lon=np.hstack((77.1025+ np.random.rand(500)*0.8-0.4,77.5946+ np.random.rand(500)*0.8-0.4,
78.4867+ np.random.rand(500)*0.8-0.4,88.3639+ np.random.rand(500)*0.8-0.4))
df['longitude']=lon
exp_start = np.datetime64('2030-01')
exp=np.array([exp_start+i for i in np.random.randint(1,61,2000)])
df['Expiry_Date']=exp
mnf_start = np.datetime64('1990-01')
mnf=np.array([mnf_start+i for i in np.random.randint(1,61,2000)])
df['manufacturingDate']=mnf
on_date=mnf+np.random.randint(0,5,2000)
df['OnRoadSince']=on_date

df.to_csv("datasetnew.csv")

