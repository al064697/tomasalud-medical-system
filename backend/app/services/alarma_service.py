# backend/app/services/alarma_service.py
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.alarma import Alarma
from app.models.medicamento import Medicamento
from app.models.historial import Historial

class AlarmaService: 
    @staticmethod
    def crear_alarmas_para_medicamento(db: Session, medicamento_id: int):
        """Crear alarmas automáticas cuando se registra"""
        medicamento = db.query(Medicamento).filter(Medicamento.ID_MEDICAMENTO == medicamento_id).first()
        if not medicamento: 
            return False
        
        # Crear alarmas basadas en la frecuencia y duración del medicamento
        fecha_inicio = datetime.now().replace(second=0, microsecond=0)
        hora_base = datetime.strptime(str(medicamento.HORA), '%H:%M:%S').time()

        alarmas_creadas = []

        for dia in range(30):  # 30 días de alarmas
            fecha_actual = fecha_inicio + timedelta(days=dia)
            hora_completa = datetime.combine(fecha_actual.date(), hora_base)
            
            # Crear múltiples alarmas según el intervalo
            horas_del_dia = 24 // medicamento.INTERVALO
            
            for i in range(horas_del_dia):
                hora_alarma = hora_completa + timedelta(hours=i * medicamento.INTERVALO)
                
                # Solo crear alarmas futuras
                if hora_alarma > datetime.now():
                    alarma = Alarma(
                        ID_MEDICAMENTO=medicamento_id,
                        HORA_PROGRAMADA=hora_alarma,
                        ESTADO='PENDIENTE'
                    )
                    db.add(alarma)
                    alarmas_creadas.append(alarma)
        
        db.commit()
        return len(alarmas_creadas)
    
    @staticmethod
    def marcar_como_tomada(db: Session, alarma_id: int):
        """Marcar alarma como tomada y crear registro en historial"""
        alarma = db.query(Alarma).filter(Alarma.ID_ALARMA == alarma.id).first()
        if not alarma:
            return False
        
        # Actualizar alarma
        alarma.ESTADO = 'TOMADA'

        # Crear registro en historial
        historial = Historial(
            FECHA_HORA=datetime.now(), 
            ESTADO='Tomado',
            OBSERVACION='Medicamento tomado según alarma',
            ID_MEDICAMENTO=alarma.ID_MEDICAMENTO
        )
        db.add(historial)
        db.commit()
        return True
    
    @staticmethod
    def posponer_alarma(db:Session, alarma_id: int, minutos: int = 15):
        """Posponer una alarma X minutos"""
        alarma = db.query(Alarma).filter(Alarma.ID_ALARMA == alarma_id).first()
        if not alarma:
            return False
        
        # Actualizar hora programada
        alarma.HORA_PROGRAMADA += timedelta(minutes=minutos)
        alarma.ESTADO = 'POSPUESTA'
        alarma.TIEMPO_POSPOSICION = minutos

        db.commit()
        return True