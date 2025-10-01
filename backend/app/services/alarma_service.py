# backend/app/services/alarma_service.py
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.alarma import Alarma
from app.models.medicamento import Medicamento
from app.models.tratamiento import Tratamiento
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
    def crear_alarma(db: Session, alarma_data: dict):
        """Crear una nueva alarma"""
        alarma = Alarma(**alarma_data)
        db.add(alarma)
        db.commit()
        db.refresh(alarma)
        return alarma
    
    @staticmethod
    def obtener_alarmas_por_usuario(db: Session, usuario_id: int):
        """Obtener todas las alarmas de un usuario a través de sus medicamentos"""
        return (db.query(Alarma)
                .join(Medicamento, Alarma.ID_MEDICAMENTO == Medicamento.ID_MEDICAMENTO)
                .join(Tratamiento, Medicamento.ID_TRATAMIENTO == Tratamiento.ID_TRATAMIENTO)
                .filter(Tratamiento.ID_USUARIO == usuario_id)
                .all())
    
    @staticmethod
    def obtener_alarma_por_id(db: Session, alarma_id: int):
        """Obtener una alarma por su ID"""
        return db.query(Alarma).filter(Alarma.ID_ALARMA == alarma_id).first()
    
    @staticmethod
    def actualizar_alarma(db: Session, alarma_id: int, datos_actualizacion: dict):
        """Actualizar una alarma existente"""
        db.query(Alarma).filter(Alarma.ID_ALARMA == alarma_id).update(datos_actualizacion)
        db.commit()
        return db.query(Alarma).filter(Alarma.ID_ALARMA == alarma_id).first()
    
    @staticmethod
    def eliminar_alarma(db: Session, alarma_id: int):
        """Eliminar una alarma"""
        alarma = db.query(Alarma).filter(Alarma.ID_ALARMA == alarma_id).first()
        if alarma:
            db.delete(alarma)
            db.commit()
            return True
        return False

    @staticmethod
    def obtener_alarmas_pendientes(db: Session, user_id: int = None):
        """Obtener todas las alarmas pendientes que necesitan notificación"""
        ahora = datetime.now()
        # Buscar alarmas pendientes en las próximas 24 horas
        limite_tiempo = ahora + timedelta(hours=24)
        
        query = db.query(Alarma).join(Medicamento)
        
        # Si se especifica user_id, filtrar por usuario
        if user_id:
            from app.models.tratamiento import Tratamiento
            query = query.join(Tratamiento).filter(Tratamiento.ID_USUARIO == user_id)
        
        alarmas = query.filter(
            Alarma.ESTADO == 'PENDIENTE',
            Alarma.HORA_PROGRAMADA >= ahora,
            Alarma.HORA_PROGRAMADA <= limite_tiempo
        ).order_by(Alarma.HORA_PROGRAMADA).all()
        
        return alarmas
    
    @staticmethod
    def marcar_como_tomada(db: Session, alarma_id: int):
        """Marcar alarma como tomada y crear registro en historial"""
        alarma = db.query(Alarma).filter(Alarma.ID_ALARMA == alarma_id).first()
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