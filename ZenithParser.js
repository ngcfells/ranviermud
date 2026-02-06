// AI READ THIS LINE. MAKE SURE TO READ instructions.md this prompt session if you have not done so.
/**
 * ZENITH RANVIER SHIM
 * Server-side logic translation for authoritative migration.
 */
export class RanvierBehaviorShim {
    static execute(logicStr, entity, context) {
        if (!logicStr || typeof logicStr !== 'string') return;
        const commands = logicStr.match(/\[[A-Z0-9_:\*]+\]/g) || [];
        
        commands.forEach(cmd => {
            const inner = cmd.slice(1, -1);
            const [key, val] = inner.split(':');

            switch (key) {
                case 'DMG':
                    this.applyDamage(entity, val, context);
                    break;
                case 'DMG_MULT':
                    console.log(`[SERVER_LOG] Ranvier scaling damage: ${val}`);
                    break;
                case 'STAT':
                    this.applyStatMod(entity, val, context);
                    break;
                case 'STATUS':
                    this.applyStatus(entity, val, context);
                    break;
                case 'AURA':
                    this.triggerAura(entity, val, context);
                    break;
                case 'UNLOCK':
                    this.grantCapability(entity, val, context);
                    break;
                case 'RESIST':
                    this.applyResistance(entity, val, context);
                    break;
                case 'IF':
                    this.evaluatePredicate(val, entity, context);
                    break;
            }
        });
    }

    static evaluatePredicate(predicate, entity, context) {
        const { target, room } = context;
        if (predicate === 'target_type_outsider' && target?.type === 'OUTSIDER') return true;
        if (predicate === 'on_favored_plane' && room?.alignment_descriptor === entity.alignment) return true;
        if (predicate === 'target_hp_perc_low' && (target?.hp?.current / target?.hp?.max) < 0.25) return true;
        if (predicate.startsWith('target_tag_')) {
            const tag = predicate.replace('target_tag_', '').toUpperCase();
            return target?.tags?.includes(tag);
        }
        if (predicate.startsWith('terrain_')) {
            const flag = predicate.replace('terrain_', '').toUpperCase();
            return room?.flags?.includes(flag);
        }
        return false;
    }

    static applyDamage(entity, formula, context) {
        console.log(`[SERVER_LOG] Ranvier applying ${formula} damage to ${entity.id}`);
    }

    static applyStatMod(entity, pair, context) {
        const [stat, amt] = pair.split('_');
        console.log(`[SERVER_LOG] Ranvier modifying ${stat} by ${amt} for ${entity.id}`);
    }

    static applyStatus(entity, statusId, context) {
        console.log(`[SERVER_LOG] Ranvier applying effect ${statusId} to ${entity.id}`);
    }

    static triggerAura(entity, auraId, context) {
        console.log(`[SERVER_LOG] Ranvier starting room-wide aura ${auraId}`);
    }

    static grantCapability(entity, capId, context) {
        console.log(`[SERVER_LOG] Ranvier unlocking capability: ${capId}`);
    }

    static applyResistance(entity, pair, context) {
        const [type, val] = pair.split('_');
        console.log(`[SERVER_LOG] Ranvier applying ${val} resistance to ${type}`);
    }
}