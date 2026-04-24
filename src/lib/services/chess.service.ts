import { supabase } from '../supabase'
import { ChessGame, User } from '@/types'

export const chessService = {
  async findOpponent(userId: string, timeControl: string, rating: number) {
    const ratingRange = 100
    const { data, error } = await supabase
      .from('chess_games')
      .select('*, white_player:users!white_player_id(*), black_player:users!black_player_id(*)')
      .eq('status', 'pending')
      .eq('time_control', timeControl)
      .gte('rating', rating - ratingRange)
      .lte('rating', rating + ratingRange)
      .limit(1)

    if (error) throw error
    return data?.[0] || null
  },

  async createGame(
    whitePlayerId: string,
    blackPlayerId: string,
    timeControl: string
  ) {
    const { data, error } = await supabase
      .from('chess_games')
      .insert([
        {
          white_player_id: whitePlayerId,
          black_player_id: blackPlayerId,
          status: 'active',
          time_control: timeControl,
          pgn: '',
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getGame(gameId: string) {
    const { data, error } = await supabase
      .from('chess_games')
      .select('*, white_player:users!white_player_id(*), black_player:users!black_player_id(*)')
      .eq('id', gameId)
      .single()

    if (error) throw error
    return data
  },

  async updateGameResult(gameId: string, result: string, pgn: string) {
    const { data, error } = await supabase
      .from('chess_games')
      .update({
        status: 'completed',
        result,
        pgn,
      })
      .eq('id', gameId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getPlayerStats(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('rating, wins, losses, draws')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  async updatePlayerStats(
    userId: string,
    result: 'win' | 'loss' | 'draw'
  ) {
    const stats = await this.getPlayerStats(userId)
    const updates =
      result === 'win'
        ? { wins: stats.wins + 1 }
        : result === 'loss'
          ? { losses: stats.losses + 1 }
          : { draws: stats.draws + 1 }

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)

    if (error) throw error
  },

  async getGameHistory(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('chess_games')
      .select('*, white_player:users!white_player_id(*), black_player:users!black_player_id(*)')
      .or(`white_player_id.eq.${userId},black_player_id.eq.${userId}`)
      .eq('status', 'completed')
      .order('updated_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },
}
